import {gql} from 'apollo-boost';

const signup = gql`
mutation Signup($Name: String, $Email: String,  $Password: String){
    signup(Name: $Name, Email: $Email, Password: $Password){
        success  
        duplicateUser      
    }
}`

const addAssignment = gql`
    
    mutation addAssignment($Name: String, $Content: String, $Points: Int, $DueDate: Date, $Courseid: String){
        addAssignment(Name: $Name, Content: $Content, Points: $Points, DueDate: $DueDate, Courseid: $Courseid){
            success
        }
    }
    
`

const addAnnouncemnet= gql` 
    mutation addAnnouncemnet($Topic: String, $Content: String, $Courseid: String, $Name: String){
        addAnnouncemnet(Topic: $Topic, Content: $Content, Courseid: $Courseid, Createdby: $Name){
            success
        }
    }
    
`


const addCourse = gql`
    
    mutation addCourse($Name: String, $Dept: String, $Nickname: String, $Desc: String, $Room: String, $Capacity: Int, $Waitlist: Int, $Term: String, $Email: String){
        addCourse(Name: $Name, Dept: $Dept, Nickname: $Nickname, Desc: $Desc, Room: $Room, Capacity: $Capacity, Waitlist: $Waitlist, Term : $Term, Email:$Email  ){
            success
        }
    }
    
`

const updateProfile = gql`
    mutation updateProfile($Name: String, $Email: String, $Phone: String, $Aboutme: String, $Country: String, $City: String, $Gender:String, $School: String, $Hometown: String, $Language: String, $Company: String){
        updateProfile(Name:$Name, Email:$Email, Phone:$Phone, Aboutme: $Aboutme, Country:$Country, City: $City, Gender: $Gender, School:$School, Hometown: $Hometown, Language: $Language, Company: $Company){
            success
        }
    }
`


export {signup, addCourse, addAnnouncemnet, addAssignment, updateProfile};