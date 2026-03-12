import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateImpactReport } from "../services/api";
// import TermsAccordion from "./TermsAccordion"; // <-- Uncomment if you are using the accordion!
import "./ImpactForm.css";

export default function ImpactForm({ setResult }) {
  const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    quantity: "",
    productMaterial: "",
    sourceDistance: "",
    baselineWeight: "",
    newWeight: "",
    pcrRatio: "",
    reuseFactor: "",
    transportMode: "truck",
    eolLandfill: "",
    eolIncineration: "",
    eolRecycling: "",
    eolReuse: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eolDistribution = {
        landfill: Number(formData.eolLandfill || 0),
        incineration: Number(formData.eolIncineration || 0),
        recycling: Number(formData.eolRecycling || 0),
        reuse: Number(formData.eolReuse || 0),
      };

      const payload = {
        customerName: formData.customerName,
        productName: formData.productName,
        quantity: Number(formData.quantity || 0),
        productMaterial: formData.productMaterial,
        sourceDistance: Number(formData.sourceDistance || 0),
        baselineWeight: Number(formData.baselineWeight || 0),
        newWeight: Number(formData.newWeight || 0),
        pcrRatio: Number(formData.pcrRatio || 0),
        reuseFactor: Number(formData.reuseFactor || 1),
        transportMode: formData.transportMode,
        eolDistribution,
      };

      const res = await generateImpactReport(payload);
      setResult(res.data);

      navigate("/result");
    } catch (error) {
      console.error(error);
      alert("Failed to generate impact report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="impact-form-container">
      <div className="impact-form-header">
        <h2 className="impact-form-title">🌍 Generate Impact Report</h2>
        <p className="impact-form-subtitle">
          Enter product details to calculate environmental sustainability.
        </p>
      </div>

      {/* <TermsAccordion /> */}

      <form className="impact-form" onSubmit={handleSubmit}>
        {/* Core Product Details */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-icon">📦</span>
            <h4 className="section-title">Core Product Details</h4>
          </div>
          <div className="form-grid">
            <div className="input-group">
              <label>Customer / Company Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="e.g. Acme Corp"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                placeholder="e.g. Bamboo Toothbrush"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Quantity Produced</label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Material Type</label>
              <select
                name="productMaterial"
                value={formData.productMaterial}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Material Type
                </option>
                <option value="plastic-free">Plastic Free</option>
                <option value="compostable">Compostable</option>
                <option value="recycled">Recycled</option>
                <option value="PET">PET (#1)</option>
                <option value="HDPE">HDPE (#2)</option>
                <option value="PP">PP (#5)</option>
                <option value="LDPE">LDPE (#4)</option>
              </select>
            </div>
            <div className="input-group">
              <label>Source Distance (km)</label>
              <input
                type="number"
                name="sourceDistance"
                placeholder="Distance from supplier"
                value={formData.sourceDistance}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Transport Mode</label>
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleChange}
              >
                <option value="truck">Truck</option>
                <option value="air">Air</option>
                <option value="rail">Rail</option>
                <option value="ocean">Ocean</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional LCA Inputs */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-icon">⚖️</span>
            <h4 className="section-title">Lifecycle Assessment (Optional)</h4>
          </div>
          <div className="form-grid">
            <div className="input-group">
              <label>Baseline Weight (g)</label>
              <input
                type="number"
                name="baselineWeight"
                placeholder="Old weight"
                value={formData.baselineWeight}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>New Weight (g)</label>
              <input
                type="number"
                name="newWeight"
                placeholder="New improved weight"
                value={formData.newWeight}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>PCR Ratio (0 - 1)</label>
              <input
                type="number"
                name="pcrRatio"
                placeholder="e.g. 0.5 for 50%"
                step="0.01"
                value={formData.pcrRatio}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Reuse Factor</label>
              <input
                type="number"
                name="reuseFactor"
                placeholder="e.g. 1 (Single use)"
                step="0.1"
                value={formData.reuseFactor}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* End-of-Life Inputs */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-icon">♻️</span>
            <h4 className="section-title">
              End-of-Life Distribution (Must total 1.0)
            </h4>
          </div>
          <div className="form-grid eol-grid">
            <div className="input-group">
              <label>Landfill %</label>
              <input
                type="number"
                name="eolLandfill"
                placeholder="e.g. 0.4"
                step="0.01"
                value={formData.eolLandfill}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Incineration %</label>
              <input
                type="number"
                name="eolIncineration"
                placeholder="e.g. 0.1"
                step="0.01"
                value={formData.eolIncineration}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Recycling %</label>
              <input
                type="number"
                name="eolRecycling"
                placeholder="e.g. 0.3"
                step="0.01"
                value={formData.eolRecycling}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Reuse %</label>
              <input
                type="number"
                name="eolReuse"
                placeholder="e.g. 0.2"
                step="0.01"
                value={formData.eolReuse}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? (
            <span className="loading-state">
              <span className="spinner"></span> Processing Data...
            </span>
          ) : (
            "✨ Generate Impact Report"
          )}
        </button>
      </form>
    </div>
  );
}
