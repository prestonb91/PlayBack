import React from "react";

type Props = {
    handleLogout: () => void;
}

const Logout: React.FC<Props> = ( { handleLogout }) => {

    return (
        <>
            <button
                onClick={handleLogout}
            >
                Logt Out
            </button>
        </>
    );
};

export default Logout;

