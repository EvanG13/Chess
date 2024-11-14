import { EmitActions } from "../../types/Actions";


const handlers = {
    handleAcceptDraw: (socket) => {
        socket.sendMessage({
          action: EmitActions.OFFER_DRAW,
          drawAction: "ACCEPT",
          gameId: sessionStorage.getItem("gameId")
        });
       
      },
    
      handleConfirmDraw: (socket) => {
        socket.sendMessage({
          action: EmitActions.OFFER_DRAW,
          drawAction: "OFFER",
          gameId: sessionStorage.getItem("gameId")
        });
       
      },
    
      handleDeclineDraw: (socket) => {
        socket.sendMessage({
          action: EmitActions.OFFER_DRAW,
          drawAction: "DENY",
          gameId: sessionStorage.getItem("gameId")
        });
       
      },
    
      handleConfirmForfeit: (socket) => {
        socket.sendMessage({
          action: EmitActions.FORFEIT,
          gameId: sessionStorage.getItem("gameId")
        });
      
      },
    
      handleCancelForfeit: () => {
      
      },

      handlePromote: (socket, piece, fromTo) => {
        console.log("in handlePromote " + fromTo + piece);
        socket.sendMessage({
            action: EmitActions.MOVE_MADE,
            move: fromTo + piece,
            gameId: sessionStorage.getItem("gameId"),
            playerId: sessionStorage.getItem("userId")
          });
       
      }
}


export default handlers;