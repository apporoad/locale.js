declare namespace Localejs {
	interface Options {
		/**
		Set to `false` to avoid spawning subprocesses and instead only resolve the locale from environment variables.
		@default true
		*/
		readonly spawn?: boolean;
	}
}

declare const Localejs: {
	/**
	@returns The locale.
	@example
	```
	const locale = require('locale.js');
	locale.set(['demo','real'])
	
	console(locale('demo'))

	console(locale.get('demo'))
	```
	*/
	(str:string,lang?: string): Function;


	/**
	 * get locale string
	 * 获取本地化（国际化）字符
	 * @param str 原始字符
	 * @param lang 语言
	 @returns The locale string.
	 */
	get(str:string,lang?: string): string;

	/**
	 * add locale map to cache 
	 * 添加国际化支持
	 * @param stringOrarrayOrJson 支持字符串，数组，或者json
	 * @param langOrValue 语言，当stringOrarrayOrJson 为字符串时，这里表示值
	 * @param lang 当stringOrarrayOrJson 为字符串时，这里表示语言
	 */
	set(stringOrarrayOrJson, langOrValue, lang? : String);

	/**
	 * set global lang
	 * 设置全局语言
	 * @param lang language
	 */
	setLanguage(lang : string)
};

export = Localejs;