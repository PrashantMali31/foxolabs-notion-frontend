import React, {useState} from "react"
import {Link} from "react-router-dom"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,

} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import {cilLockLocked, cilUser, cilHome} from "@coreui/icons"
import {useDispatch} from "react-redux"
import {loginRequest, loginAdminRequest} from "../../../redux/actions"
import {useSnackbar} from "react-simple-snackbar"
import {useCookies} from "react-cookie";

const Login = () => {

  const dispatch = useDispatch()
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const [cookies, setCookie] = useCookies(["user"]);
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [workspaceId, setWorkspaceId] = useState("")

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginRequest({
        email,
        password,
        workspaceId,
      }))
      if (response?.action?.payload.status === 200) {
        setCookie("token_v2", response?.action?.payload?.accessToken, { path: "/" });
        openSnackbar(response.action.payload.message)
        localStorage.setItem("token", JSON.stringify(response.action.payload))
      } else {
        openSnackbar(response.message)
      }
    } catch (err) {
      openSnackbar(err.message)
    }

  }
  const handleAdminLogin = async () => {
    try {
      const response = await dispatch(loginAdminRequest({
        email,
        password,
      }))
      if (response?.action?.payload.status === 200) {
        openSnackbar(response.action.payload.message)
        localStorage.setItem("admin_token", JSON.stringify(response.action.payload))
      } else {
        openSnackbar(response.message)
      }
    } catch (err) {
      openSnackbar(err.message)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              {
                !isAdmin ? (
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>User Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput placeholder="Username" autoComplete="username" onChange={(e) => {
                            setEmail(e.target.value)
                          }} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilHome} />
                          </CInputGroupText>
                          <CFormInput placeholder="WorkspaceId" autoComplete="WorkspaceId" onChange={(e) => {
                            setWorkspaceId(e.target.value)
                          }} />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4"
                              onClick={() => {handleLogin()}}
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">

                          </CCol>
                        </CRow>
                        <CRow>
                          <CButton color="link" className="px-0"
                            onClick={() => setIsAdmin(!isAdmin)}
                          >
                            Login as admin
                          </CButton>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                ) : (
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Admin Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput placeholder="Username" autoComplete="username" onChange={(e) => {
                            setEmail(e.target.value)
                          }} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                          />
                        </CInputGroup>

                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4"
                              onClick={() => {handleAdminLogin()}}
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">

                          </CCol>
                        </CRow>
                        <CRow>
                          <CButton color="link" className="px-0"
                            onClick={() => setIsAdmin(!isAdmin)}
                          >
                            Login as user
                          </CButton>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                )
              }


            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
