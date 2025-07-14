'use client';

import { logout } from "../login/actions"

export default function Dashboard() {
    return (
        <>
            <h1 className="text-2xl font-bold flex justify-center items-center p-20">DashBoard</h1>
            <button onClick={() => logout()}>Logout</button>
        </>
    )
}