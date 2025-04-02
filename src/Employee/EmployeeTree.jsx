// src/components/EmployeeTree.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import "./EmployeeTree.css";

// Updated sample data with more fields
const orgChartData = {
  name: "Arjun Mehta",
  attributes: {
    title: "CEO",
    email: "Arjun.Mehta@example.com",
    phone: "+91-98765-43210",
    department: "Management",
  },
  children: [
    {
      name: "Priya Iyer",
      attributes: {
        title: "CTO",
        email: "Priya.Iyer@example.com",
        phone: "+91-87654-32109",
        department: "Technology",
      },
      children: [
        {
          name: "Rohan Sharma",
          attributes: {
            title: "Finance Manager",
            email: "Rohan.Sharma@example.com",
            phone: "+91-99887-65432",
            department: "Finance",
          },
        },
        {
          name: "Ananya Nair",
          attributes: {
            title: "Accountant",
            email: "Ananya.Nair@example.com",
            phone: "+91-88776-54321",
            department: "Finance",
          },
        },
        {
          name: "Vikram Rao",
          attributes: {
            title: "Security Analyst",
            email: "Vikram.Rao@example.com",
            phone: "+91-77665-43210",
            department: "Security",
          },
        },
      ],
    },
    {
      name: "Siddharth Verma",
      attributes: {
        title: "COO",
        email: "Siddharth.Verma@example.com",
        phone: "+91-66554-32100",
        department: "Operations",
      },
      children: [
        {
          name: "Meera Banerjee",
          attributes: {
            title: "Operations Manager",
            email: "Meera.Banerjee@example.com",
            phone: "+91-55443-21099",
            department: "Operations",
          },
        },
        {
          name: "Kabir Malhotra",
          attributes: {
            title: "Logistics Coordinator",
            email: "Kabir.Malhotra@example.com",
            phone: "+91-44332-10988",
            department: "Logistics",
          },
        },
      ],
    },
    {
      name: "Neha Kulkarni",
      attributes: {
        title: "CFO",
        email: "Neha.Kulkarni@example.com",
        phone: "+91-33221-09877",
        department: "Finance",
      },
      children: [
        {
          name: "Arvind Joshi",
          attributes: {
            title: "Treasury Head",
            email: "Arvind.Joshi@example.com",
            phone: "+91-22110-98766",
            department: "Finance",
          },
        },
        {
          name: "Farhan Khan",
          attributes: {
            title: "Risk Analyst",
            email: "Farhan.Khan@example.com",
            phone: "+91-11099-87655",
            department: "Risk Management",
          },
        },
      ],
    },
  ],
};

// Node colors based on position
const getNodeColor = (title) => {
  switch (title) {
    case "CEO": return "node-ceo";
    case "CTO": return "node-cto";
    case "COO": return "node-coo";
    case "CFO": return "node-cfo";
    case "Finance Manager":
    case "Treasury Head": return "node-finance";
    case "Accountant":
    case "Risk Analyst": return "node-accountant";
    case "Security Analyst":
    case "Logistics Coordinator": return "node-security";
    case "Operations Manager": return "node-operations";
    default: return "node-default";
  }
};

const getInitials = (name) => {
  return name.split(" ").map(word => word[0]).join("").toUpperCase();
};

const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const nodeClass = getNodeColor(nodeDatum.attributes?.title);

  return (
    <g>
      <rect
        x={-120}
        y={-70}
        width={240}
        height={140}
        rx={10}
        ry={10}
        className={`employee-new-node-bg ${nodeClass}`}
      />
      <foreignObject width="230" height="130" x="-115" y="-65">
        <div
          onClick={toggleNode}
          className="employee-new-node"
          xmlns="http://www.w3.org/1999/xhtml"
        >
          <div className="employee-avatar">
            {getInitials(nodeDatum.name)}
          </div>
          <div className="employee-info">
            <h3>{nodeDatum.name}</h3>
            {nodeDatum.attributes?.title && <p>{nodeDatum.attributes.title}</p>}
            {nodeDatum.attributes?.email && (
              <p>📧 <a href={`mailto:${nodeDatum.attributes.email}`}>{nodeDatum.attributes.email}</a></p>
            )}
            {nodeDatum.attributes?.phone && <p>📞 {nodeDatum.attributes.phone}</p>}
            {nodeDatum.attributes?.department && <p>🏢 {nodeDatum.attributes.department}</p>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

const EmployeeTree = () => {
  const treeContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const width = treeContainerRef.current.offsetWidth;
        const height = treeContainerRef.current.offsetHeight;
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 4 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div ref={treeContainerRef} className="employee-new-tree-container">
      <Tree
        data={orgChartData}
        orientation="vertical"
        collapsible={true}
        translate={translate}
        pathFunc="straight"
        nodeSize={{ x: 250, y: 180 }}
        separation={{ siblings: 1.2, nonSiblings: 1.5 }}
        zoomable={true}
        initialDepth={1}
        renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
        styles={{
          links: {
            stroke: "#94a3b8",
            strokeWidth: 2,
          },
        }}
        transitionDuration={300}
        shouldCollapseNeighborNodes={true}
        depthFactor={250}
      />
    </div>
  );
};

export default EmployeeTree;