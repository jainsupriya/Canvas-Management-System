
import {gql} from 'apollo-boost';

const login = gql`
query login($Email: String, $Password: String){
        login(Email: $Email, Password: $Password){
            result
            userData{
                Name
                Email
                Role
              }
        }
    }`

const profile = gql`
    query profile($Email: String){
        profile(Email: $Email){
            Email
            Name
            Aboutme
            Country
            City
            Gender
            Hometown
            School
            Company
            Languages
            Phone
        }
    }
`


const course = gql`
    query course($Email:String){
        course(Email: $Email){
            courses{
                Name
                Nickname
                Dept
                Desc
                Term
                _id
            }
        }
    }
`
const assignment = gql`
    query assignment($Courseid:String){
        assignment(Courseid: $Courseid){
            assignments{
                Name
                Content
                DueDate
                _id
                Points
            }
        }
    }
`

const announcement = gql`
    query announcement($Courseid:String){
        announcement(Courseid: $Courseid){
            announcements{
                Title
                Content
                CreatedAt
                CreatedBy
                Courseid
            }
        }
    }
`
const file = gql`
    query file($Courseid:String){
        file(Courseid: $Courseid){
            files{
                Name
                Type
                Path
                Size
                CreatedAt
                CreatedBy
            }
        }
    }
`

const quiz = gql`
    query quiz($Courseid:String){
        quiz(Courseid: $Courseid){
            quizzes{
                Title
                Content
                DueDate
                Marks
                NoOfQuestions
            }
        }
    }
`

export {login, course,profile, assignment, announcement, file, quiz};