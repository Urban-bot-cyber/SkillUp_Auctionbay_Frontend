import LoginForm from 'components/user/LoginForm'
import { FC } from 'react'

const Login: FC = () =>{
    return (
        <div className="container-fluid d-flex flex-column vh-100">
          <div className="row flex-grow-1">
            <div className="col-lg-8 bg-light d-flex justify-content-center align-items-center">
              <img src="/images/items.png" alt="auctionbay" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }}/>
            </div>
            <div className="col-lg-4">
              <LoginForm />
            </div>
          </div>
        </div>
      )
}   

export default Login