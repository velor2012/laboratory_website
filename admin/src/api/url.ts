export default class MyUrl{
    static base_url = process.env.BASE_URL
    static login_url = MyUrl.base_url + 'user/login'

}