const simpleBotInfo = (bot, groupData) => new Promise(async(resolve, reject) => {
	try {
		
		const myJid = bot?.user?.id?.split("@")[0]?.split(":")[0] + "@s.whatsapp.net"
		
		let isBotAdmin = false;
		let isBotSuperAdmin = false;
		groupData.admins.map(admin => {
			if (admin.id === myJid) isBotAdmin = true
      if (admin.id === myJid && admin.admin === "superadmin") isBotSuperAdmin = true
		})
		
		const res = {
			type: bot?.type,
			platform: process?.platform,
			termux: !!process?.env?.TERMUX_VERSION,
			jid: myJid,
			username: bot?.user?.name,
			isBotAdmin,
			isBotSuperAdmin,
			botOwner: process?.env.BOT_OWNER || undefined,
		}
		
		resolve(res)
		
} catch(e) {
	reject(e)
}
})

export default simpleBotInfo