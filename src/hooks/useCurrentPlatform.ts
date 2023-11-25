// 判断当前平台是否是移动端
export default function useCurrentPlatform(): string {
    const agent: string = navigator.userAgent.toLowerCase();
    
    // 移动端
    const isMobile = /iphone|ipod|ipad|android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|skyfire|micromessenger/i
                    .test(agent)
    // PC端
    const isMac: boolean = /macintosh|mac os x/i.test(agent);

    if(isMobile){
        return "mobile"
    } 
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return "win32"
    }
    if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return "win64"
    }
    if (isMac) {
        return "mac"
    }
    else {
        return "linux"
    }
}