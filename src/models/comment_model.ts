
interface ICommentModel {
    UID: string;
    user: string;
    body: string;
    likes: string;
    commentTime: Date;
    postReference: string;
}

class CommentModel {
    UID: string;
    user: string;
    body: string;
    likes: string;
    commentTime: Date;
    postReference: string;

    constructor({ ...props }: ICommentModel) {
        this.UID = props.UID;
        this.user = props.user;
        this.body = props.body;
        this.likes = props.likes;
        this.commentTime = props.commentTime;
        this.postReference = props.postReference;
    }
}
export default CommentModel;