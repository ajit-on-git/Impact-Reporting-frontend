import "./ImpactResult.css";

export default function ImpactResult({ result }) {
  if (!result)
    return (
      <div className="no-report-container">
        <div className="empty-state-icon">🌱</div>
        <h3>No Sustainability Report Generated Yet</h3>
        <p>
          Please fill out the form and generate the impact report to see your
          results here.
        </p>
      </div>
    );

  // 1. Dig into the 'data' property if it exists
  const payload = result.data || result;

  // 2. Extract backend-calculated fields
  const report = payload._doc || payload.impactReport || payload;

  // 3. Extract LCA fields
  const lca = payload;

  const plasticSaved =
    report.plastic_saved_grams != null
      ? Number(report.plastic_saved_grams).toFixed(2)
      : "0.00";

  const carbonAvoided =
    report.carbon_avoided_kg != null
      ? Number(report.carbon_avoided_kg).toFixed(3)
      : "0.000";

  const localImpact = report.local_sourcing_summary || "N/A";
  const aiStatement = report.impact_statement || "N/A";

  // Safely extract EOL percentages for the visual bar
  const eol = lca.eolDistribution || {};
  const landfillPct = (Number(eol.landfill) || 0) * 100;
  const incinPct = (Number(eol.incineration) || 0) * 100;
  const recyclePct = (Number(eol.recycling) || 0) * 100;
  const reusePct = (Number(eol.reuse) || 0) * 100;

  return (
    <div className="impact-container">
      <div className="impact-header">
        <h2 className="impact-title">✨ Sustainability Impact Report</h2>
        <p className="impact-subtitle">
          Here is the environmental footprint of your order.
        </p>
      </div>

      <div className="impact-result-content">
        {/* Top Level Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card plastic">
            <span className="metric-icon">♻️</span>
            <div className="metric-info">
              <h4>Plastic Saved</h4>
              <p className="metric-value">
                {plasticSaved} <span className="unit">grams</span>
              </p>
            </div>
          </div>

          <div className="metric-card carbon">
            <span className="metric-icon">☁️</span>
            <div className="metric-info">
              <h4>Carbon Avoided</h4>
              <p className="metric-value">
                {carbonAvoided} <span className="unit">kg CO₂e</span>
              </p>
            </div>
          </div>

          <div className="metric-card local">
            <span className="metric-icon">📍</span>
            <div className="metric-info">
              <h4>Local Impact</h4>
              <p className="metric-text">{localImpact}</p>
            </div>
          </div>
        </div>

        {/* AI Statement Callout */}
        <div className="ai-statement-card">
          <div className="ai-badge">🤖 AI Analysis</div>
          <p className="ai-text">"{aiStatement}"</p>
        </div>

        <hr className="divider" />

        {/* LCA Section */}
        <div className="lca-section">
          <h3>Optional LCA Inputs</h3>
          <div className="lca-grid">
            <div className="lca-item">
              <span className="lca-label">Baseline Weight</span>
              <span className="lca-value">
                {lca.baselineWeight != null
                  ? Number(lca.baselineWeight).toFixed(2)
                  : "0.00"}{" "}
                g
              </span>
            </div>
            <div className="lca-item">
              <span className="lca-label">New Weight</span>
              <span className="lca-value">
                {lca.newWeight != null
                  ? Number(lca.newWeight).toFixed(2)
                  : "0.00"}{" "}
                g
              </span>
            </div>
            <div className="lca-item">
              <span className="lca-label">PCR Ratio</span>
              <span className="lca-value">
                {lca.pcrRatio != null
                  ? Number(lca.pcrRatio).toFixed(2)
                  : "0.00"}
              </span>
            </div>
            <div className="lca-item">
              <span className="lca-label">Reuse Factor</span>
              <span className="lca-value">
                {lca.reuseFactor != null
                  ? Number(lca.reuseFactor).toFixed(2)
                  : "1.00"}
              </span>
            </div>
            <div className="lca-item">
              <span className="lca-label">Transport Mode</span>
              <span className="lca-value capitalize">
                {lca.transportMode || "truck"}
              </span>
            </div>
          </div>
        </div>

        {/* Visual EOL Distribution Bar */}
        {lca.eolDistribution && (
          <div className="eol-section">
            <h3>End-of-Life Distribution</h3>

            <div className="eol-visual-bar">
              {landfillPct > 0 && (
                <div
                  className="eol-segment landfill"
                  style={{ width: `${landfillPct}%` }}
                ></div>
              )}
              {incinPct > 0 && (
                <div
                  className="eol-segment incin"
                  style={{ width: `${incinPct}%` }}
                ></div>
              )}
              {recyclePct > 0 && (
                <div
                  className="eol-segment recycle"
                  style={{ width: `${recyclePct}%` }}
                ></div>
              )}
              {reusePct > 0 && (
                <div
                  className="eol-segment reuse"
                  style={{ width: `${reusePct}%` }}
                ></div>
              )}
            </div>

            <div className="eol-legend">
              <div className="legend-item">
                <span className="dot landfill-dot"></span> Landfill:{" "}
                {landfillPct.toFixed(0)}%
              </div>
              <div className="legend-item">
                <span className="dot incin-dot"></span> Incineration:{" "}
                {incinPct.toFixed(0)}%
              </div>
              <div className="legend-item">
                <span className="dot recycle-dot"></span> Recycling:{" "}
                {recyclePct.toFixed(0)}%
              </div>
              <div className="legend-item">
                <span className="dot reuse-dot"></span> Reuse:{" "}
                {reusePct.toFixed(0)}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
