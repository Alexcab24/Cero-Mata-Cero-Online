import { tailChase } from 'ldrs'
import '../styles/waitingStyles.css'
tailChase.register()

export const WaitingModal = ({ code }) => {
    return (
        <div className="WaitingOverlay">
            <div className="waitingContent">
                <h1>Cero Mata Cero</h1>
                <div className="waitingCodeContainer">
                    <h2>Game PIN:</h2>
                    <p>{code}</p>
                </div>
            </div>

            <div className="WaitingPlayers">
                <l-tail-chase
                    size="40"
                    speed="1.75"
                    color="white"
                ></l-tail-chase>
                <h2>Esperando adversario...</h2>
            </div>
        </div>
    )
}

export default WaitingModal
