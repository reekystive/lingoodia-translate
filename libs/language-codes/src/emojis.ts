// cspell:disable

import { LanguageCode } from './language-code.ts';

export const languageCodes = [
  'af',
  'am',
  'ar',
  'as',
  'az',
  'be',
  'bg',
  'bn',
  'bo',
  'bs',
  'ca',
  'ccp',
  'ceb',
  'chr',
  'ckb',
  'co',
  'crk',
  'cs',
  'cy',
  'da',
  'de',
  'dz',
  'el',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'ff',
  'fi',
  'fil',
  'fr',
  'fy',
  'ga',
  'gd',
  'gl',
  'gu',
  'haw',
  'he',
  'hi',
  'hmn',
  'hr',
  'ht',
  'hu',
  'hy',
  'id',
  'is',
  'it',
  'iu',
  'ja',
  'jv',
  'jw',
  'ka',
  'kk',
  'km',
  'kn',
  'ko',
  'ku',
  'ky',
  'la',
  'lb',
  'lis',
  'lo',
  'lt',
  'lv',
  'mez',
  'mg',
  'mi',
  'mk',
  'ml',
  'mn',
  'mni-Mtei',
  'mr',
  'ms',
  'mt',
  'mul-beng',
  'mul-cyrl',
  'mul-deva',
  'mul-ethi',
  'mul-latn',
  'mul',
  'my',
  'myh',
  'nb',
  'ne',
  'nl',
  'nn',
  'no',
  'nv',
  'ny',
  'oj',
  'one',
  'or',
  'osa',
  'pa',
  'pl',
  'ps',
  'pt-BR',
  'pt-PT',
  'rhg',
  'ro',
  'rom',
  'ru',
  'sa',
  'sd',
  'see',
  'si',
  'sk',
  'sl',
  'sm',
  'sn',
  'so',
  'sq',
  'sr',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'ti',
  'tl',
  'tr',
  'tt',
  'ug',
  'uk',
  'ur',
  'uz',
  'uzs',
  'vi',
  'win',
  'xh',
  'yi',
  'yo',
  'zh-CN',
  'zh-Hans',
  'zh-Hant',
  'zh-HK',
  'zh-TW',
  'zh-yue',
  'zu',
] as const;

/**
 * Genetated by gpt-4-turbo
 *
 * 请注意，这个映射是基于语言通常与特定国家或地区的关联，但并不是唯一的。
 * 例如，英语、阿拉伯语、法语、西班牙语和葡萄牙语等广泛使用的语言在世界上有很多说话者，
 * 因此可能会有多个国家旗帜与之相关联。在这种情况下，我选择了其中一个较为典型的国家。
 * 对于使用地球 emoji（🌐）的语言，这表示它们没有特定的国家旗帜，或者跨越多个国家和地区。
 */
export const languageEmojiMap: Record<LanguageCode, string> = {
  'af': '🇿🇦', // 南非
  'am': '🇪🇹', // 埃塞俄比亚
  'ar': '🇸🇦', // 沙特阿拉伯（阿拉伯语在多个国家使用）
  'as': '🇮🇳', // 印度（阿萨姆邦）
  'az': '🇦🇿', // 阿塞拜疆
  'be': '🇧🇾', // 白俄罗斯
  'bg': '🇧🇬', // 保加利亚
  'bn': '🇧🇩', // 孟加拉国（孟加拉语）
  'bo': '🇨🇳', // 中国（藏语）
  'bs': '🇧🇦', // 波斯尼亚和黑塞哥维那
  'ca': '🇪🇸', // 西班牙（加泰罗尼亚地区）
  'ccp': '🇧🇩', // 孟加拉国（查克马语）
  'ceb': '🇵🇭', // 菲律宾（宿务语）
  'chr': '🇺🇸', // 美国（切罗基语）
  'ckb': '🇮🇶', // 伊拉克（中部库尔德语）
  'co': '🇫🇷', // 法国（科西嘉岛）
  'crk': '🇨🇦', // 加拿大（平原克里语）
  'cs': '🇨🇿', // 捷克
  'cy': '🇬🇧', // 英国（威尔士）
  'da': '🇩🇰', // 丹麦
  'de': '🇩🇪', // 德国
  'dz': '🇧🇹', // 不丹
  'el': '🇬🇷', // 希腊
  'en': '🇬🇧', // 英国（英语在多个国家使用）
  'eo': '🌐', // 世界语（没有对应国家）
  'es': '🇪🇸', // 西班牙
  'et': '🇪🇪', // 爱沙尼亚
  'eu': '🇪🇸', // 西班牙（巴斯克地区）
  'fa': '🇮🇷', // 伊朗
  'ff': '🌐', // 富拉语（在多个西非国家使用）
  'fi': '🇫🇮', // 芬兰
  'fil': '🇵🇭', // 菲律宾
  'fr': '🇫🇷', // 法国
  'fy': '🇳🇱', // 荷兰（西弗里西亚地区）
  'ga': '🇮🇪', // 爱尔兰
  'gd': '🇬🇧', // 英国（苏格兰盖尔语）
  'gl': '🇪🇸', // 西班牙（加利西亚地区）
  'gu': '🇮🇳', // 印度（古吉拉特邦）
  'haw': '🇺🇸', // 美国（夏威夷）
  'he': '🇮🇱', // 以色列
  'hi': '🇮🇳', // 印度
  'hmn': '🌐', // 苗语（在中国、越南等国使用）
  'hr': '🇭🇷', // 克罗地亚
  'ht': '🇭🇹', // 海地
  'hu': '🇭🇺', // 匈牙利
  'hy': '🇦🇲', // 亚美尼亚
  'id': '🇮🇩', // 印度尼西亚
  'is': '🇮🇸', // 冰岛
  'it': '🇮🇹', // 意大利
  'iu': '🇨🇦', // 加拿大（因纽特语）
  'ja': '🇯🇵', // 日本
  'jv': '🇮🇩', // 印度尼西亚（爪哇语）
  'jw': '🇮🇩', // 印度尼西亚（爪哇语）
  'ka': '🇬🇪', // 格鲁吉亚
  'kk': '🇰🇿', // 哈萨克斯坦
  'km': '🇰🇭', // 柬埔寨
  'kn': '🇮🇳', // 印度（卡纳达语）
  'ko': '🇰🇷', // 韩国
  'ku': '🌐', // 库尔德语（在多个国家使用）
  'ky': '🇰🇬', // 吉尔吉斯斯坦
  'la': '🌐', // 拉丁语（没有对应国家）
  'lb': '🇱🇺', // 卢森堡
  'lis': '🌐', // 彝语（在中国等地使用）
  'lo': '🇱🇦', // 老挝
  'lt': '🇱🇹', // 立陶宛
  'lv': '🇱🇻', // 拉脱维亚
  'mez': '🇺🇸', // 美国（梅诺米尼语）
  'mg': '🇲🇬', // 马达加斯加
  'mi': '🇳🇿', // 新西兰（毛利语）
  'mk': '🇲🇰', // 北马其顿
  'ml': '🇮🇳', // 印度（马拉雅拉姆语）
  'mn': '🇲🇳', // 蒙古
  'mni-Mtei': '🇮🇳', // 印度（曼尼普尔语）
  'mr': '🇮🇳', // 印度（马拉地语）
  'ms': '🇲🇾', // 马来西亚
  'mt': '🇲🇹', // 马耳他
  'mul-beng': '🌐', // 多种语言（孟加拉语）
  'mul-cyrl': '🌐', // 多种语言（西里尔字母）
  'mul-deva': '🌐', // 多种语言（天城体）
  'mul-ethi': '🌐', // 多种语言（埃塞俄比亚字母）
  'mul-latn': '🌐', // 多种语言（拉丁字母）
  'mul': '🌐', // 多种语言
  'my': '🇲🇲', // 缅甸
  'myh': '🇺🇸', // 美国（马卡语）
  'nb': '🇳🇴', // 挪威（博克马尔语）
  'ne': '🇳🇵', // 尼泊尔
  'nl': '🇳🇱', // 荷兰
  'nn': '🇳🇴', // 挪威（尼诺斯克语）
  'no': '🇳🇴', // 挪威
  'nv': '🇺🇸', // 美国（纳瓦霍语）
  'ny': '🇲🇼', // 马拉维（齐切瓦语）
  'oj': '🇨🇦', // 加拿大（奥吉布瓦语）
  'one': '🇨🇦', // 加拿大（奥奈达语）
  'or': '🇮🇳', // 印度（奥里亚语）
  'osa': '🇺🇸', // 美国（奥萨格语）
  'pa': '🇮🇳', // 印度（旁遮普语）
  'pl': '🇵🇱', // 波兰
  'ps': '🇦🇫', // 阿富汗（普什图语）
  'pt-BR': '🇧🇷', // 巴西（葡萄牙语）
  'pt-PT': '🇵🇹', // 葡萄牙
  'rhg': '🇲🇲', // 缅甸（罗兴亚语）
  'ro': '🇷🇴', // 罗马尼亚
  'rom': '🌐', // 罗姆语（在多个国家使用）
  'ru': '🇷🇺', // 俄罗斯
  'sa': '🇮🇳', // 印度（梵语）
  'sd': '🇵🇰', // 巴基斯坦（信德语）
  'see': '🇨🇦', // 加拿大（塞内卡语）
  'si': '🇱🇰', // 斯里兰卡（僧伽罗语）
  'sk': '🇸🇰', // 斯洛伐克
  'sl': '🇸🇮', // 斯洛文尼亚
  'sm': '🇼🇸', // 萨摩亚
  'sn': '🇿🇼', // 津巴布韦（绍纳语）
  'so': '🇸🇴', // 索马里
  'sq': '🇦🇱', // 阿尔巴尼亚
  'sr': '🇷🇸', // 塞尔维亚
  'su': '🇮🇩', // 印度尼西亚（巽他语）
  'sv': '🇸🇪', // 瑞典
  'sw': '🇹🇿', // 坦桑尼亚（斯瓦希里语）
  'ta': '🇮🇳', // 印度（泰米尔语）
  'te': '🇮🇳', // 印度（泰卢固语）
  'tg': '🇹🇯', // 塔吉克斯坦
  'th': '🇹🇭', // 泰国
  'ti': '🇪🇷', // 厄立特里亚（提格利尼亚语）
  'tl': '🇵🇭', // 菲律宾（塔加洛语）
  'tr': '🇹🇷', // 土耳其
  'tt': '🇷🇺', // 俄罗斯（鞑靼语）
  'ug': '🇨🇳', // 中国（维吾尔语）
  'uk': '🇺🇦', // 乌克兰
  'ur': '🇵🇰', // 巴基斯坦（乌尔都语）
  'uz': '🇺🇿', // 乌兹别克斯坦
  'uzs': '🇺🇿', // 乌兹别克斯坦（南乌兹别克语）
  'vi': '🇻🇳', // 越南
  'win': '🇺🇸', // 美国（霍查克语）
  'xh': '🇿🇦', // 南非（科萨语）
  'yi': '🌐', // 意第绪语（在多个国家使用）
  'yo': '🇳🇬', // 尼日利亚（约鲁巴语）
  'zh-CN': '🇨🇳', // 中国（简体中文）
  'zh-Hans': '🇨🇳', // 中国（简体中文）
  'zh-Hant': '🇹🇼', // 台湾（繁体中文）
  'zh-HK': '🇭🇰', // 香港（中文）
  'zh-TW': '🇹🇼', // 台湾（繁体中文）
  'zh-yue': '🇭🇰', // 香港（粤语）
  'zu': '🇿🇦', // 南非（祖鲁语）
};
