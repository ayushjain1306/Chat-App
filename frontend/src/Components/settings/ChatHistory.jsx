import React from "react";

const tdStyle = {
    cursor: "pointer",
    color: "rgb(9 141 220)",
    fontSize: "16.5px"
}

const ChatHistory = () => {
    return (
        <div style={{ marginTop: "6vh" }}>
            <h4 className="h4">Chat History</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Clear All Chats</td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Delete All Chats</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ChatHistory;