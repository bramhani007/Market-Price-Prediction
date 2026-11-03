import { useEffect, useRef } from 'react';
// Import Plotly from pre-installed plotly.js-dist-min
import Plotly from 'plotly.js-dist-min';

interface PlotlyChartProps {
  data: any[];
  layout: any;
  config?: any;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlotlyChart({ data, layout, config, className = '', style }: PlotlyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mergedLayout = {
      autosize: true,
      margin: { l: 48, r: 24, t: 36, b: 40 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: {
        family: 'ui-sans-serif, system-ui, sans-serif',
        size: 12,
        color: '#334155'
      },
      ...layout
    };

    const mergedConfig = {
      responsive: true,
      displayModeBar: false,
      ...config
    };

    Plotly.react(containerRef.current, data, mergedLayout, mergedConfig);

    const handleResize = () => {
      if (containerRef.current) {
        Plotly.Plots.resize(containerRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, layout, config]);

  return <div ref={containerRef} className={`w-full min-h-[300px] ${className}`} style={style} />;
}
