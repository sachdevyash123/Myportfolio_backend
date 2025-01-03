const nodemailer=require('nodemailer')
const dotenv=require('dotenv')
dotenv.config()
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})
const sendEmailController=async(req,res)=>{
    const {name,email,message}=req.body;
    if (!name || !email || !message) {
        return res.status(400).send({ success: false, message: 'All fields are required.' });
    }
    try {
        await transporter.sendMail({
            from:email,
            to:process.env.EMAIL,
            subject:`New Contact Request from ${name}`,
            text:`You have a new message from ${name} (${email}):\n\n${message}`,
        });
        await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:'Thank you for Reaching Out!',
            text:`Hi ${name},\n\nThank you for contacting me! I will get back to you as soon as possible. \n\nBest regards,\nYash`,
        })
        return res.status(200).send({success:true,message:'Email sent successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'send email API error',error:error})
    }
}
module.exports={sendEmailController}