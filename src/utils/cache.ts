const prefix = 'SOLOCOVE_' // 项目前缀名

export const Storage = {
	setItem: (key: string, value: any, days: number = 1): void => {
		const expires = new Date().getTime() + days * 24 * 60 * 60 * 1000

		const itemValue = JSON.stringify({
			value,
			expires
		})

		try {
			window.localStorage.setItem(`${prefix}${key}`, itemValue)
		} catch (error) {
			console.error('localStorage.setItem Error:', error);
		}
	},
	getItem: (key: string): any => {
		const itemValue = window.localStorage.getItem(`${prefix}${key}`)

		if (!itemValue) {
			return null
		}

		try {
			const parsedItem = JSON.parse(itemValue)
			if (Date.now() > parsedItem.expires) {
				console.warn(`Cached item '${key}' has expired.`);
				return null;
			}

			return parsedItem.value
		} catch (error) {
			console.error(`Error parsing cached item '${key}':`, error);
			return null;
		}
	},
	removeItem: (key: string) => {
		window.localStorage.removeItem(`${prefix}${key}`)
	},
	clearAll: () => {
		window.localStorage.clear()
	}
}