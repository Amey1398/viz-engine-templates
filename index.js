/** Import registry for approved visualization templates. */
import * as committee_briefing from "./committee_briefing.js";
import * as concentration_risk from "./concentration_risk.js";
import * as control_effectiveness_coverage from "./control_effectiveness_coverage.js";
import * as data_flows from "./data_flows.js";
import * as dependency_mapping from "./dependency_mapping.js";
import * as essential_services_mapping from "./essential_services_mapping.js";
import * as findings_material_incidents from "./findings_material_incidents.js";
import * as historical_trends from "./historical_trends.js";
import * as incident_resilience_review from "./incident_resilience_review.js";
import * as issue_concentration_aging from "./issue_concentration_aging.js";
import * as kpi_views from "./kpi_views.js";
import * as particle_flow from "./particle_flow.js";
import * as remediation_deadlines from "./remediation_deadlines.js";
import * as risk_matrices from "./risk_matrices.js";
import * as visual_argument from "./visual_argument.js";
import * as visual_risk_bowtie from "./visual_risk_bowtie.js";
export const templates = {
  "committee_briefing": committee_briefing,
  "concentration_risk": concentration_risk,
  "control_effectiveness_coverage": control_effectiveness_coverage,
  "data_flows": data_flows,
  "dependency_mapping": dependency_mapping,
  "essential_services_mapping": essential_services_mapping,
  "findings_material_incidents": findings_material_incidents,
  "historical_trends": historical_trends,
  "incident_resilience_review": incident_resilience_review,
  "issue_concentration_aging": issue_concentration_aging,
  "kpi_views": kpi_views,
  "particle_flow": particle_flow,
  "remediation_deadlines": remediation_deadlines,
  "risk_matrices": risk_matrices,
  "visual_argument": visual_argument,
  "visual_risk_bowtie": visual_risk_bowtie
};
export function createRiskOption(templateId, data, options = {}) { const t = templates[templateId]; if (!t) throw new Error(`Unknown template: ${templateId}`); return t.createOption(data, options); }
