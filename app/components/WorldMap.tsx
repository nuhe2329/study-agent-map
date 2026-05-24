'use client';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ComposableMap, Geographies, Geography, ZoomableGroup } = require('react-simple-maps');
import { SUPPORTED_COUNTRIES } from '../data/agents';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  '036': 'AUS', '124': 'CAN', '826': 'GBR', '840': 'USA',
  '554': 'NZL', '372': 'IRL', '276': 'DEU', '458': 'MYS',
};

type Props = {
  selectedCountry: string | null;
  onCountrySelect: (code: string, name: string) => void;
};

export default function WorldMap({ selectedCountry, onCountrySelect }: Props) {
  return (
    <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={[0, 10]} zoom={1.2}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numericId = String(geo.id).padStart(3, '0');
                const alpha3 = ISO_NUMERIC_TO_ALPHA3[numericId];
                const isSupported = alpha3 ? !!SUPPORTED_COUNTRIES[alpha3] : false;
                const isSelected = alpha3 === selectedCountry;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isSupported && alpha3) {
                        onCountrySelect(alpha3, SUPPORTED_COUNTRIES[alpha3]);
                      }
                    }}
                    style={{
                      default: {
                        fill: isSelected
                          ? '#3b82f6'
                          : isSupported
                          ? '#22c55e'
                          : '#1e293b',
                        stroke: '#0f172a',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      hover: {
                        fill: isSelected
                          ? '#2563eb'
                          : isSupported
                          ? '#16a34a'
                          : '#334155',
                        stroke: '#0f172a',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isSupported ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: '#1d4ed8',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
