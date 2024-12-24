import React from "react";
import { useNavigate } from "react-router-dom";

const tdStyle = {
    cursor: "pointer",
    color: "rgb(9 141 220)",
    fontSize: "16.5px"
}

const PrivacySettings = () => {
    const navigate = useNavigate();

    return (
        <div style={{ marginTop: "6vh" }}>
            <h4 className="h4">Privacy Settings</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={tdStyle} onClick={() => navigate("blocked-users")}>Blocked Users</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PrivacySettings;