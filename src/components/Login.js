import './css/Login.css';

const Login = () => {
    return (
        <div>
            <form>
                <h2>Login</h2>
                <div className="form-element">
                    <h3>Username</h3>
                    <input type="text" placeholder="Scrivi il tuo username..."/>
                </div>
                <div className="form-element">
                    <h3>Password</h3>
                    <input type="password" placeholder="Scrivi la tua password..."/>
                </div>
                <button>Invia</button>
            </form>
        </div>
    );
}
 
export default Login;