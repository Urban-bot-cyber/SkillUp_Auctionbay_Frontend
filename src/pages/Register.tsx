import RegisterForm from 'components/user/RegisterForm'
import { FC } from 'react'

const Register: FC = () =>{
    return (
        <div className="container-fluid d-flex flex-column vh-100s">
          <div className="row flex-grow-1">
            <div className="col-lg-8 bg-light d-flex justify-content-center align-items-center">
              <img src="/images/items.png" alt="auctionbay" />
            </div>
            <div className="col-lg-4">
              <RegisterForm />
            </div>
          </div>
        </div>
      )
}   

export default Register