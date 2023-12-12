import profile from '../../assets/profilePhoto.jpg'
import linkedIcon from '../../assets/linkedIn.png'
import githubIcon from '../../assets/github.png'
import instaIcon from '../../assets/instagram.png'
const AboutUs =()=>{   
return(
<div className='flex w-full mt-6 justify-center'>
<div className='flex flex-col items-center w-96 h-96 rounded-lg bg-yellow-200 shadow-lg '>
    <img className=' h-32 w-32 rounded-full mx-auto mt-3'src={profile} />
    <h3 className='mt-3 text-lg font-medium text-gray-800' >Akash Paralikar</h3>
    <span className='mt-1 text-sm text-gray-700'>Web Developer</span>
    <div className='mt-8 flex'>
        <a href='https://www.linkedin.com/in/akash-paralikar-b5131b15a/'><img  className="w-8 h-8 rounded-full cursor-pointer" src={linkedIcon}></img></a>
        <a href='https://github.com/akashrp'><img className=" w-8 h-8 rounded-full ml-2 cursor-pointer" src={githubIcon}></img></a>
        <a href='https://www.instagram.com/paralikarakash/'> <img className=" w-8 h-8 rounded-full ml-2 cursor-pointer" src={instaIcon}></img></a>
    </div>
</div>
</div>    
)
}
export default AboutUs