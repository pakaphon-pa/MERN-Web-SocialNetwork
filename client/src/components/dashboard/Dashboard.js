import React , { useEffect , Fragment }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link  } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount } from '../../actions/profile'

const Dashboard = ({ getCurrentProfile , deleteAccount , auth: {user} , profile: {profile , loading} }) =>{
    useEffect(() =>{
        getCurrentProfile()
    }, [getCurrentProfile])
  
    
    return loading && profile === null? 
                    ( <Spinner /> ) : 
                    ( <Fragment>  
                        <h1 className="large text-primary" >ข้อมูลส่วนตัว</h1>
                        <p className="lead">
                            <i className="fa fas-user"/> ยินดีต้อนรับ { user && user.name }
                        </p>
                        { profile !== null ? 
                            <Fragment>
                                <DashboardActions />
                                <Experience experience={profile.experience}/>
                                <Education education={profile.education}/>
                                <div className="my-2">
                                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                        <i className="fas fa-user-minus"></i> Delete My Account
                                    </button>
                                </div>
                            </Fragment> : 
                            <Fragment>
                                <p>คุณยังไม่ได้กรอกข้อมูลส่วนตัว กรุณากรอกข้อมูล</p>
                                <Link to="/create-profile" className="btn btn-primary my-1">
                                    กรอกข้อมูลส่วนตัว
                                </Link>
                            </Fragment>}
                    </Fragment> )
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired

}  

const mapStateToProps = state =>({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps,{ getCurrentProfile  , deleteAccount })(Dashboard)