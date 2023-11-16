const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('UserContract', () => {
  let userData;
  let user1, user2, user3, user4, user5, user6, user7, user8;
  let email, username, bio, ava, facebook, twitter, instagram, youtube, twitch, quickAmount;

  before(async () => {
    [user1, user2, user3, user4, user5, user6, user7, user8] = await ethers.getSigners();

    const UserDataFactory = await ethers.getContractFactory('UserContract');
    userData = await UserDataFactory.deploy();
    await userData.deployed();
  });

  beforeEach(() => {
    email = 'user1@example.com';
    username = 'user1';
    bio = 'A user';
    ava = 'avatar1.jpg';
    facebook = 'user1fb';
    twitter = 'user1twitter';
    instagram = 'user1instagram';
    youtube = 'user1youtube';
    twitch = 'user1twitch';
    quickAmount = ['100', '200', '300', '400'];
  });

  describe('Add User', () => {
    it('should register user', async () => {
      await userData.connect(user1).addUser(email, username, bio, ava, facebook, twitter, instagram, youtube, twitch, quickAmount);

      const isUser = await userData.isUser(user1.address);
      expect(isUser).to.be.true;
    });

    it('should get user profile', async () => {
      const [
        email,
        username,
        bio,
        ava,
        fb,
        tw,
        insta,
        yt,
        tt,
        quick
      ] = await userData.getUser(user1.address);

      expect(email).to.equal('user1@example.com');
      expect(username).to.equal('user1');
      expect(bio).to.equal('A user');
      expect(ava).to.equal('avatar1.jpg');
      expect(fb).to.equal('user1fb');
      expect(tw).to.equal('user1twitter');
      expect(insta).to.equal('user1instagram');
      expect(yt).to.equal('user1youtube');
      expect(tt).to.equal('user1twitch');
      expect(quick).to.deep.equal(['100', '200', '300', '400']);
    });

    it('should prevent duplicate username', async () => {
      await userData.connect(user2).addUser(email, 'user2', bio, ava, facebook, twitter, instagram, youtube, twitch, quickAmount);

      await expect(
        userData.connect(user3).addUser('email2@example.com', 'user2', 'Another user', 'avatar2.jpg', 'user2fb', 'user2twitter', 'user2instagram', 'user2youtube', 'user2twitch', ['900', '1000', '1100', '1200'])
      ).to.be.revertedWith('Username sudah digunakan');
    });

    it('should prevent duplicate address', async () => {
      await userData.connect(user3).addUser(email, 'user3', bio, ava, facebook, twitter, instagram, youtube, twitch, quickAmount);

      await expect(
        userData.connect(user3).addUser('email3@example.com', 'user4', 'Another user', 'avatar3.jpg', 'user3fb', 'user3twitter', 'user3instagram', 'user3youtube', 'user3twitch', ['900', '1000', '1100', '1200'])
      ).to.be.revertedWith('Alamat sudah terdaftar');
    });
  });

  describe('Edit User', () => {
    it('should update user profile', async () => {
      await userData.connect(user1).editUser('newemail@example.com', 'newusername', 'New bio', 'newavatar.jpg', 'newfb', 'newtwitter', 'newinsta', 'newyoutube', 'newtwitch', ['500', '600', '700', '800']);

      const [editedEmail, editedUsername, editedBio, editedAva, editedFb, editedTw, editedInsta, editedYt, editedTt, editedQuick] = await userData.getUser(user1.address);
      expect(editedEmail).to.equal('newemail@example.com');
      expect(editedUsername).to.equal('newusername');
      expect(editedBio).to.equal('New bio');
      expect(editedAva).to.equal('newavatar.jpg');
      expect(editedFb).to.equal('newfb');
      expect(editedTw).to.equal('newtwitter');
      expect(editedInsta).to.equal('newinsta');
      expect(editedYt).to.equal('newyoutube');
      expect(editedTt).to.equal('newtwitch');
      expect(editedQuick).to.deep.equal(['500', '600', '700', '800']);
    });
  });

  describe('Get All User', () => {
    it('should get all user data', async () => {
      const allUsers = await userData.getAllUsers();
      expect(allUsers[1].username).to.equal('user2');
      expect(allUsers[2].username).to.equal('user3');
    });
  });

  describe('isUsernameTaken', () => {
    it('should check if a username is taken', async () => {
      await userData.connect(user7).addUser(email, 'user7', bio, ava, facebook, twitter, instagram, youtube, twitch, quickAmount);

      const isTaken = await userData.isUsernameTaken('user7');
      expect(isTaken).to.be.true;

      const isNotTaken = await userData.isUsernameTaken('user10');
      expect(isNotTaken).to.be.false;
    });
  });
});



