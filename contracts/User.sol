// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserContract {
    struct SocialMedia {
        string facebook;
        string twitter;
        string instagram;
        string youtube;
        string twitch;
    }

    struct UserData {
        string email;
        address wallet;
        string username;
        string bio;
        string ava;
        SocialMedia socialMedia;
        string[4] quickAmount;
    }

    mapping(address => UserData) public users;
    address[] public userAddresses;
    mapping(string => address) public usernameToAddress;

    function addUser(
        string memory _email,
        string memory _username,
        string memory _bio,
        string memory _ava,
        string memory _facebook,
        string memory _twitter,
        string memory _instagram,
        string memory _youtube,
        string memory _twitch,
        string[4] memory _quickAmount
    ) external {
        require(
            users[msg.sender].wallet == address(0),
            "Alamat sudah terdaftar"
        );
        require(
            usernameToAddress[_username] == address(0),
            "Username sudah digunakan"
        );

        UserData memory newUser = UserData({
            email: _email,
            wallet: msg.sender,
            username: _username,
            bio: _bio,
            ava: _ava,
            socialMedia: SocialMedia({
                facebook: _facebook,
                twitter: _twitter,
                instagram: _instagram,
                youtube: _youtube,
                twitch: _twitch
            }),
            quickAmount: _quickAmount
        });

        users[msg.sender] = newUser;
        userAddresses.push(msg.sender);
        usernameToAddress[_username] = msg.sender;
    }

    function editUser(
        string memory _email,
        string memory _username,
        string memory _bio,
        string memory _ava,
        string memory _facebook,
        string memory _twitter,
        string memory _instagram,
        string memory _youtube,
        string memory _twitch,
        string[4] memory _quickAmount
    ) external {
        require(
            users[msg.sender].wallet != address(0),
            "Pengguna tidak ditemukan"
        );
        require(
            keccak256(abi.encodePacked(_username)) ==
                keccak256(abi.encodePacked(users[msg.sender].username)) ||
                usernameToAddress[_username] == address(0),
            "Username sudah digunakan"
        );

        users[msg.sender].email = _email;
        users[msg.sender].username = _username;
        users[msg.sender].bio = _bio;
        users[msg.sender].ava = _ava;
        users[msg.sender].socialMedia.facebook = _facebook;
        users[msg.sender].socialMedia.twitter = _twitter;
        users[msg.sender].socialMedia.instagram = _instagram;
        users[msg.sender].socialMedia.youtube = _youtube;
        users[msg.sender].socialMedia.twitch = _twitch;
        users[msg.sender].quickAmount = _quickAmount;
    }

    function getUser(
        address _wallet
    )
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string[4] memory
        )
    {
        for (uint256 i = 0; i < userAddresses.length; i++) {
            if (users[userAddresses[i]].wallet == _wallet) {
                UserData memory userData = users[userAddresses[i]];
                return (
                    userData.email,
                    userData.username,
                    userData.bio,
                    userData.ava,
                    userData.socialMedia.facebook,
                    userData.socialMedia.twitter,
                    userData.socialMedia.instagram,
                    userData.socialMedia.youtube,
                    userData.socialMedia.twitch,
                    userData.quickAmount
                );
            }
        }
        // Mengembalikan data default jika pengguna tidak ditemukan
        return ("", "", "", "", "", "", "", "", "", ["", "", "", ""]);
    }

    function getAllUsers() external view returns (UserData[] memory) {
        UserData[] memory allUsers = new UserData[](userAddresses.length);

        for (uint i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }

        return allUsers;
    }

    function isUsernameTaken(
        string memory _username
    ) external view returns (bool) {
        if (msg.sender != usernameToAddress[_username]) {
            return usernameToAddress[_username] != address(0);
        }
        return false;
    }

    function isUser(address _userAddress) external view returns (bool) {
        return users[_userAddress].wallet != address(0);
    }
}
