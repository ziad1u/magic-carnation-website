import React, { useState } from "react";
import { updateSiteContent } from "./siteContent";

interface EditableWrapperProps {
  id: string; // معرف العنصر في siteContent
  children: (value: string) => React.ReactNode;
}

const EditableWrapper: React.FC<EditableWrapperProps> = ({ id, children }) => {
  const item = siteContent.find((i) => i.id === id);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item?.value || "");

  if (!item) return null;

  const handleSave = () => {
    updateSiteContent(id, value);
    setEditing(false);
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children(item.value)}
      {editing && (
        <div style={{ position: "absolute", top: 30, left: 0, zIndex: 20, background: "#222", padding: 12, borderRadius: 8 }}>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            style={{ padding: 6, borderRadius: 4, border: "1px solid #888", marginBottom: 8 }}
          />
          <button style={{ marginRight: 8, background: "#ec4899", color: "white", border: "none", borderRadius: 4, padding: "4px 12px" }} onClick={handleSave}>حفظ</button>
          <button style={{ background: "#444", color: "white", border: "none", borderRadius: 4, padding: "4px 12px" }} onClick={() => setEditing(false)}>إلغاء</button>
        </div>
      )}
    </span>
  );
};

export default EditableWrapper; 