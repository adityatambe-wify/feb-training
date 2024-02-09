
class UserModel {
    constructor(id, username, phone_no, age) {
        this.id = id;
        this.username = username;
        this.phone_no = phone_no;
        this.age = age;
        this.createdAt = new Date();
    }
}

module.exports = UserModel;
