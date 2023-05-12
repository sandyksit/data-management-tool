const chai = require('chai');
const { mockRequest } = require('mock-req-res');
const { User, Role, Permission } = require('../../models/User');
const auth = require('./auth')();
const user = require('../accounts/user/user')();

const { expect } = chai;

const mockResponse = () => ({
  status(status) {
    this.code = status;
    return this;
  },
  json(body) {
    this.result = body;
    return this;
  },
  send(body) {
    this.result = body;
    return this;
  },
});

describe('Authentication', () => {
  beforeEach(async () => {
    if (process.env.ENV !== 'test') {
      throw new Error('Invalid environment.');
    }

    await User.deleteMany();
    await Role.deleteMany();
    await Permission.deleteMany();
  });

  describe('Login', () => {
    it('Should return status code 400 without email or password', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await auth.login(req, res);
      expect(res.code).to.equal(400);
    });

    it('Should return status code 400 without email', async () => {
      const req = mockRequest({
        body: {
          email: 'test@gmail.com',
        },
      });
      const res = mockResponse();
      await auth.login(req, res);
      expect(res.code).to.equal(400);
    });

    it('Should return status code 404 when user with given email and password not found', async () => {
      const req = mockRequest({
        body: {
          email: 'test@gmail.com',
          password: '123456',
        },
      });
      const res = mockResponse();
      await auth.login(req, res);
      expect(res.code).to.equal(404);
    });

    it('Should return status code 200 along with token when login with registered user', async () => {
      const req = mockRequest({
        body: {
          email: 'test@gmail.com',
          password: '123456',
          name: 'test',
        },
      });
      const res = mockResponse();
      await user.register(req, res);
      const resForLogin = mockResponse();
      await auth.login(req, resForLogin);
      expect(resForLogin.code).to.equal(200);
      expect(resForLogin.result.token).length.greaterThan(10);
    });

    it('Should return status code 401 when user password does not match registered user`s password', async () => {
      const req = mockRequest({
        body: {
          email: 'test@gmail.com',
          password: '123456',
          name: 'test',
        },
      });
      const res = mockResponse();
      await user.register(req, res);
      const resForLogin = mockResponse();
      req.body.password = '123';
      await auth.login(req, resForLogin);
      expect(resForLogin.code).to.equal(401);
    });
  });

  describe('Role', () => {
    it('Should return status code 200 when role added successfully', async () => {
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
    });

    it('Should return status code 200 when listing roles', async () => {
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      await auth.postRole(req, res);
      const findReq = mockRequest();
      const findRes = mockResponse();
      await auth.getRole(findReq, findRes);
      expect(findRes.code).to.equal(200);
      expect(findRes.result.data).to.be.an('array');
    });

    it('Should return status code 200 when finding role by ID', async () => {
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
      const { _id } = res.result.data;
      const reqForRoleById = mockRequest({
        params: {
          _id,
        },
      });
      const resForRoleById = mockResponse();
      await auth.getRoleById(reqForRoleById, resForRoleById);
      expect(resForRoleById.code).to.equal(200);
      expect(`${resForRoleById.result.data?.[0]._id}`).to.equal(`${_id}`);
    });

    it('Should return status code 200 when updating role', async () => {
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      // Can't await due to callback use in postRole.
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
      const { _id } = res.result.data;
      const reqForRoleById = mockRequest({
        params: {
          _id,
        },
        body: {
          name: 'test role 1',
        },
      });
      const resForRoleById = mockResponse();
      await auth.putRole(reqForRoleById, resForRoleById);
      expect(resForRoleById.code).to.equal(200);
      expect(`${resForRoleById.result.data?.name}`).to.equal('test role 1');
    });

    it('Should return status code 200 when deleting role', async () => {
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      // Can't await due to callback use in postRole.
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
      const { _id } = res.result.data;
      const reqForRoleById = mockRequest({
        params: {
          _id,
        },
      });
      const resForRoleById = mockResponse();
      await auth.deleteRole(reqForRoleById, resForRoleById);
      expect(resForRoleById.code).to.equal(200);
      expect(resForRoleById.result.message).to.equal('success');
    });
  });

  describe('Permission', () => {
    let roleId = null;

    beforeEach(async () => {
      // Add a role
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      // Can't await due to callback use in postRole.
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
      const { _id } = res.result.data;
      roleId = _id;
    });

    it('Should return status code 200 when adding a permission', async () => {
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: [],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);
      expect(resForAddingPermission.code).to.equal(200);
      expect(`${resForAddingPermission.result.data._id}`).to.length.greaterThan(3);
    });

    it('Should return status code 200 when updating a permission', async () => {
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: [],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);
      expect(resForAddingPermission.code).to.equal(200);
      const { _id } = resForAddingPermission.result.data;
      const reqForUpdatingPermission = mockRequest({
        body: {
          moduleName: 'Quote 1',
          role: roleId,
          action: [],
        },
        params: {
          _id,
        },
      });
      const resForUpdatingPermission = mockResponse();
      await auth.putPermission(reqForUpdatingPermission, resForUpdatingPermission);
      expect(resForUpdatingPermission.code).to.equal(200);
      expect(resForUpdatingPermission.result.data.moduleName).to.equal('Quote 1');
    });

    it('Should return status code 200 when deleting a permission', async () => {
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: [],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);
      expect(resForAddingPermission.code).to.equal(200);
      const { _id } = resForAddingPermission.result.data;
      const reqForDeletingPermission = mockRequest({
        params: {
          _id,
        },
      });
      const resForDeletingPermission = mockResponse();
      await auth.deletePermission(reqForDeletingPermission, resForDeletingPermission);
      expect(resForDeletingPermission.code).to.equal(200);
      expect(resForDeletingPermission.result.message).to.equal('success');
    });

    it('Should return status code 200 when listing permissions', async () => {
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: [],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);
      expect(resForAddingPermission.code).to.equal(200);
      const reqForPermissions = mockRequest();
      const resForPermissions = mockResponse();
      await auth.getPermission(reqForPermissions, resForPermissions);
      expect(resForPermissions.code).to.equal(200);
      expect(resForPermissions.result.data).to.be.an('array');
    });

    it('Should return status code 200 when finding permission by ID', async () => {
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: [],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);
      expect(resForAddingPermission.code).to.equal(200);
      const { _id } = resForAddingPermission.result.data;
      const reqForPermission = mockRequest({
        params: {
          _id,
        },
      });
      const resForPermission = mockResponse();
      await auth.getPermissionById(reqForPermission, resForPermission);
      expect(resForPermission.code).to.equal(200);
      expect(`${resForPermission.result.data?.[0]._id}`).to.be.equal(`${_id}`);
    });
  });

  describe('Validate JWT', () => {
    it('Should return status code 401 when authorization header is missing', () => {
      const req = mockRequest();
      const res = mockResponse();
      auth.validateJWT(req, res, () => {});
      expect(res.code).to.equal(401);
    });

    it('Should return status code 401 when authorization header is invalid', () => {
      const req = mockRequest({
        headers: {
          authentication: 'Bearer invalid',
        },
      });
      const res = mockResponse();
      auth.validateJWT(req, res, () => {});
      expect(res.code).to.equal(401);
    });
  });

  describe('Access control', () => {
    let userId = null;
    let roleId = null;

    beforeEach(async () => {
      // Create dummy user, role, permissions
      // Add a role
      const req = mockRequest({
        body: {
          name: 'test role',
        },
      });
      const res = mockResponse();
      await auth.postRole(req, res);
      expect(res.code).to.equal(200);
      const { _id } = res.result.data;
      roleId = _id;
      // Add permission in role
      const reqForAddingPermission = mockRequest({
        body: {
          moduleName: 'Quote',
          role: roleId,
          action: ['Add'],
        },
      });
      const resForAddingPermission = mockResponse();
      await auth.postPermission(reqForAddingPermission, resForAddingPermission);

      expect(resForAddingPermission.code).to.equal(200);
      expect(`${resForAddingPermission.result.data._id}`).to.length.greaterThan(3);

      // Add user and assign role
      const reqForUser = mockRequest({
        body: {
          email: 'test@gmail.com',
          password: '123456',
          name: 'test',
          role: [{ _id: roleId }],
        },
      });
      const resForUser = mockResponse();
      await user.register(reqForUser, resForUser);
      userId = resForUser.result.data._id;
    });

    it('Should return status code 401 when user does not have appropriate permission', (done) => {
      const req = mockRequest();
      req.user = {};
      req.user._id = userId;
      const res = mockResponse();
      auth
        .accessControl('Quote', 'Edit')(req, res, () => {
          // Should not be called.
          expect(true).to.equal(false);
          done();
        })
        .then(() => {
          expect(res.code).to.equal(401);
          done();
        });
    });

    it('Should call `next` function when user have appropriate permission', async () => {
      const req = mockRequest();
      req.user = {
        role: [{ _id: roleId }],
      };
      req.user._id = userId;
      const res = mockResponse();
      await auth.accessControl('Quote', 'Add')(req, res, () => {
        // Should be called.
        expect(true).to.equal(true);
      });
    });
  });
});
