import { useState } from "react";
import "./ImpactTerms.css";

const accordionData = [
  {
    title: "Understanding Material Types",
    content: (
      <>
        <p>
          Selecting the correct material helps determine how easily the product
          can be recycled or broken down naturally.
        </p>

        <ul>
          <li>
            <strong>Compostable:</strong> Made from organic materials that break
            down entirely into non-toxic natural elements (like soil) under
            specific composting conditions.
          </li>
          <li>
            <strong>PET (Polyethylene Terephthalate):</strong> A clear, strong,
            and lightweight plastic. <em>Commonly used for:</em> Water bottles,
            soda bottles, and clear food jars. Highly recyclable (Resin Code
            #1).
          </li>
          <li>
            <strong>HDPE (High-Density Polyethylene):</strong> A sturdy, opaque
            plastic that resists moisture and chemicals.{" "}
            <em>Commonly used for:</em> Milk jugs, shampoo bottles, and
            detergent containers. Highly recyclable (Resin Code #2).
          </li>
          <li>
            <strong>PP (Polypropylene):</strong> A tough, heat-resistant
            plastic. <em>Commonly used for:</em> Yogurt containers, bottle caps,
            Tupperware, and reusable drinkware (Resin Code #5).
          </li>
          <li>
            <strong>LDPE (Low-Density Polyethylene):</strong> A flexible, thin
            plastic. <em>Commonly used for:</em> Grocery bags, plastic wrap, and
            squeeze bottles. Harder to recycle at standard facilities (Resin
            Code #4).
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Optional LCA (Lifecycle Assessment) Inputs",
    content: (
      <>
        <p>
          These metrics help measure the specific environmental improvements
          made to your product compared to older versions.
        </p>

        <ul>
          <li>
            <strong>Baseline weight per unit (g):</strong> The original,
            standard weight of your product before making any eco-friendly
            improvements.
          </li>
          <li>
            <strong>New weight per unit (g):</strong> The updated weight of your
            product. If this is lower than the baseline, the calculator will
            show how much raw material you saved by "lightweighting" the design.
          </li>
          <li>
            <strong>PCR Ratio (0-1):</strong> Stands for "Post-Consumer
            Recycled." This represents the fraction of the product made from
            recycled trash rather than brand-new materials. <em>Example:</em>{" "}
            Entering <code className="term-code">0.3</code> means the product is
            30% recycled material.
          </li>
          <li>
            <strong>Reuse Factor:</strong> How many times a single product is
            expected to be used before being thrown away. <em>Example:</em> A
            disposable paper cup has a reuse factor of{" "}
            <code className="term-code">1</code>. A heavy-duty reusable plastic
            cup might have a reuse factor of{" "}
            <code className="term-code">50</code>.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "End-of-Life Distribution (0 to 1)",
    content: (
      <>
        <p>
          This section defines what physically happens to your product when the
          consumer is done with it. The numbers are percentages entered as
          decimals (e.g., 0.5 = 50%). Ideally, these four numbers should add up
          to exactly 1.0 (100%).
        </p>
        <ul>
          <li>
            <strong>Landfill:</strong> The fraction of the product that is
            thrown in the regular trash and buried in a municipal dump.{" "}
            <em>Example:</em> <code className="term-code">0.6</code> means 60%
            goes to the landfill.
          </li>
          <li>
            <strong>Recycling:</strong> The fraction that is successfully
            sorted, melted down, and reprocessed into new raw materials.
          </li>
          <li>
            <strong>Incineration:</strong> The fraction that is burned. This is
            often done at industrial plants to generate electricity
            (Waste-to-Energy), but it releases carbon emissions into the air.
          </li>
          <li>
            <strong>Reuse:</strong> The fraction of the product that is kept
            intact and passed on to be used again (like being donated to a
            thrift store or returned to the manufacturer for a refill).
          </li>
        </ul>
      </>
    ),
  },
];

export default function ImpactTerms() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    // If clicking the currently open item, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-wrapper">
      <h3 className="accordion-title">💡 Need help with the terminology?</h3>
      <div className="accordion-list">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className={`accordion-card ${openIndex === index ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => toggleAccordion(index)}
            >
              <span className="accordion-trigger-text">{item.title}</span>
              <span className="accordion-trigger-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div className="accordion-body">
              <div className="accordion-body-inner">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
