import * as firebase from "firebase";

export class AuthService {
    token: any;
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }
    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {

                // {this.router.navigate(['/']);
                firebase.auth().currentUser?.getToken()
                    .then(

                        (token: string) => this.token = token
                    )
            }
            )
            .catch(
                error => console.log(error)
            );
    }
    getToken() {
        firebase.auth().currentUser?.getToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }
}