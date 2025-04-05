import React from "react";

const BreastCancerSymptoms = () => {
  const symptoms = [
    {
      title: "Lump in the Breast or Underarm",
      description:
        "A new, hard lump or mass, often painless but sometimes tender.",
    },
    {
      title: "Change in Breast Size or Shape",
      description: "Swelling, shrinkage, or distortion in one breast.",
    },
    {
      title: "Skin Changes",
      description:
        "Dimpling, puckering, or thickening of the skin, sometimes resembling an orange peel.",
    },
    {
      title: "Nipple Discharge",
      description:
        "Any fluid leaking from the nipple, especially if it's bloody or occurs without squeezing.",
    },
    {
      title: "Inverted or Retracted Nipple",
      description:
        "Nipple turning inward instead of pointing outward.",
    },
    {
      title: "Redness or Scaliness",
      description:
        "Rash-like symptoms around the nipple or breast skin.",
    },
    {
      title: "Pain in the Breast or Nipple",
      description:
        "Persistent pain not related to the menstrual cycle.",
    },
    {
      title: "Lymph Node Swelling",
      description:
        "Enlarged lymph nodes near the collarbone or under the arm.",
    },
  ];

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-serif text-pink-400 mb-4">
        Breast Cancer Symptoms
      </h1>
      <p className="text-green-500 mb-6">
        Early detection of breast cancer can greatly improve the chances of
        successful treatment. Here are some of the most common signs and
        symptoms to look out for:
      </p>

      <ul className="list-disc text-start pl-6 text-gray-200 space-y-3">
        {symptoms.map((symptom, index) => (
          <li key={index}>
            <strong>{symptom.title}:</strong> {symptom.description}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-green-500">
        <strong>Note:</strong> These symptoms don't always mean breast cancer.
        However, if you notice any changes, it's important to consult a
        healthcare professional promptly.
      </p>
    </div>
  );
};

export default BreastCancerSymptoms;
