import { useNavigate } from 'react-router';
import { handleTrulyDisconnected, socket } from '../utils/socket';

function SocketListenner() {
    const navigate = useNavigate();

    useEffect(() => {

        socket.on('reDirectedBack', handleTrulyDisconnected);

        return (() => {
            socket.off('reDirectedBack', handleTrulyDisconnected)
        })
    }, [navigate]);

    return null
}

export default SocketListenner