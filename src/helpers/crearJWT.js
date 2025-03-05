import jwt from 'jsonwebtoken'
const generarJWT=(idToken, rol)=>{
    const token=jwt.sign({idToken, rol}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token;
}
export default generarJWT;