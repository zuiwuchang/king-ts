declare module 'king/strings' {
    /*~ 驗證 字符串 是否是 ipv4 格式 xxx.xxx.xxx.xxx */
    function IsIPV4(str: string): string;

    enum MatchGMailRS {
        //匹配 成功
        Success,
    
        //匹配 用戶名@主機名
        SplitLess, //沒有以 @ 分隔 用戶名 主機名
        SplitLarge,	//出現 多個 @
    
        //匹配用戶名
        LenLess, 	//用戶名太短
        LenLarge, 	//用戶名太長
        BadBegin,	//驗證用戶名 開始
        BadEnd,		//驗證用戶名 結尾
        PointLink,	//多個 . 相連
    
        //匹配主機名
        BadHost,
    };
    function MatchGMail(str: string): MatchGMailRS 
}