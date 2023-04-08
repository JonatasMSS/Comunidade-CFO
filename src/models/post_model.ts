
interface IPostModel {

    UID: string;
    user: string;
    team:string;
    userId:string;
    title: string;
    body: string;
    likes: string;
    postTime: Date;

}

class PostModel {
    UID: string;
    user: string;
    team:string;
    userId:string;
    title: string;
    body: string;
    likes: string;
    postTime: Date;
    constructor({ ...props }: IPostModel) {
        this.UID = props.UID;
        this.user = props.user;
        this.title = props.title;
        this.body = props.body;
        this.likes = props.likes;
        this.postTime = props.postTime;
        this.userId = props.userId;
        this.team = props.team;
    }

}

export default PostModel;