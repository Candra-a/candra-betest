const sinon = require('sinon');
const { expect } = require('chai');

const userController = require('../controllers/userController');
const userService = require('../services/user_service');
const variableUser = require('../variableUsers/user')

describe('UserController', () => {
  describe('createUser', () => {
    it('should call userService.createUser with the request body and return the created user', async () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const newUser = variableUser.CREATE_USER;

      sinon.stub(userService, 'createUser').resolves(newUser);

      await userController.createUser(req, res);

      expect(userService.createUser.calledOnceWith(req.body)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: newUser, message: 'User created' })).to.be.true;

      userService.createUser.restore(); // Restore the original function
    });
  });

  describe('login', () => {
    it('should call userService.login with the request body and return the login result', async () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const loginResult = variableUser.LOGIN_RESULT;

      sinon.stub(userService, 'login').resolves(loginResult);

      await userController.login(req, res);

      expect(userService.login.calledOnceWith(req.body)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: loginResult, message: 'Login successfully' })).to.be.true;

      userService.login.restore(); // Restore the original function
    });
  });

  describe('showUserById', () => {
    it('should call userService.showUserById with the ID parameter and return the user data', async () => {
      const req = { params: { id: 'user_id' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const userData = variableUser.;

      sinon.stub(userService, 'showUserById').resolves(userData);

      await userController.showUserById(req, res);

      expect(userService.showUserById.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: userData })).to.be.true;

      userService.showUserById.restore(); // Restore the original function
    });
  });

  describe('updateDataUser', () => {
    it('should call userService.findOneAndUpdateUser with the ID parameter and request body and return the updated user data', async () => {
      const req = { params: { id: 'user_id' }, body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const updatedUser = variableUser.DATA_USER;

      sinon.stub(userService, 'findOneAndUpdateUser').resolves(updatedUser);

      await userController.updateDataUser(req, res);

      expect(userService.findOneAndUpdateUser.calledOnceWith(req.params.id, req.body)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: updatedUser, message: 'Update success' })).to.be.true;

      userService.findOneAndUpdateUser.restore(); // Restore the original function
    });
  });

  describe('showAllUser', () => {
    it('should call userService.showAllUser and return the list of all users', async () => {
      const req = {};
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const allUsers = [variableUser.USER_INFO];

      sinon.stub(userService, 'showAllUser').resolves(allUsers);

      await userController.showAllUser(req, res);

      expect(userService.showAllUser.calledOnce).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: allUsers })).to.be.true;

      userService.showAllUser.restore(); // Restore the original function
    });
  });

  describe('showOneUserByAccountNumber', () => {
    it('should call userService.showOneUserByAccountNumber with the account number parameter and return the user data', async () => {
      const req = { params: { account_number: 'account_number' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const userData = variableUser.USER_INFO;

      sinon.stub(userService, 'showOneUserByAccountNumber').resolves(userData);

      await userController.showOneUserByAccountNumber(req, res);

      expect(userService.showOneUserByAccountNumber.calledOnceWith(req.params.account_number)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: userData })).to.be.true;

      userService.showOneUserByAccountNumber.restore(); // Restore the original function
    });
  });

  describe('showOneUserByRegistrationNumber', () => {
    it('should call userService.showOneUserByRegistrationNumber with the registration number parameter and return the user data', async () => {
      const req = { params: { registration_number: 'registration_number' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const userData = variableUser.USER_INFO;

      sinon.stub(userService, 'showOneUserByRegistrationNumber').resolves(userData);

      await userController.showOneUserByRegistrationNumber(req, res);

      expect(userService.showOneUserByRegistrationNumber.calledOnceWith(req.params.registration_number)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ data: userData })).to.be.true;

      userService.showOneUserByRegistrationNumber.restore(); // Restore the original function
    });

    // Add more tests for error handling, invalid input, etc.
  });

  describe('deleteUser', () => {
    it('should call userService.deleteUser with the ID parameter and return success message', async () => {
      const req = { params: { id: 'user_id' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(userService, 'deleteUser').resolves();

      await userController.deleteUser(req, res);

      expect(userService.deleteUser.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ message: `Data with id:${req.params.id} successfully deleted` })).to.be.true;

      userService.deleteUser.restore(); // Restore the original function
    });
  });
});
