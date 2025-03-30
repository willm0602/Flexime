import type { NextRequest } from "next/server";

const getIP = (req: NextRequest) => {
    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
    if (!ip) return null;
    
    const ips = ip.split(",");
    return ips[0].trim();
}

export default getIP;