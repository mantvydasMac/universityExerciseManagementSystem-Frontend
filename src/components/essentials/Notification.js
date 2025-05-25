import './styles/Notification.css';

export default function Notification({visible, text}) {


    return (
        <div className={`notification ${visible ? 'show' : 'hide'}`}>
            <b>{text}</b>
        </div>
    );
}