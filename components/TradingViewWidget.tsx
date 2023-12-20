'use client'

// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget(): React.ReactElement {
    const container = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"; // TRADINGVIEW
            // script.src = "https://harga-emas.org/widget/widget.js"; // ANTAM
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
                "width": "980",
                "height": "610",
                "symbol": "FX_IDC:XAUIDR",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "support_host": "https://www.tradingview.com"
              }`; //TRADINGVIEW


            // script.innerText = `
            // {
            //     v_widget_type="chart_gold_antam";
	        //     v_period=90;//hari
	        //     v_width=400;
	        //     v_height=300;
	        //     he_org_show_chart(v_widget_type,v_period,v_width,v_height,'div_chart_antam');
            // }`
            container.current?.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
            {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div> */}
        </div>
        // <div id="div_chart_antam"></div>
    );
}

export default memo(TradingViewWidget);



{/* <script src="https://harga-emas.org/widget/widget.js"></script>
<script>
	v_widget_type="chart_gold_antam";
	v_period=90;//hari
	v_width=400;
	v_height=300;
	he_org_show_chart(v_widget_type,v_period,v_width,v_height,'div_chart_antam');
</script> */}