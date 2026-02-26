import { templateRegistry, templateDocs } from '../templates/registry';
import { templateSampleData } from './sampleData';
import './TemplateShowcase.css';

export default function TemplateShowcase() {
  // Get all template names
  const templateNames = Object.keys(templateRegistry);

  return (
    <div className="showcase-container">
      <header className="showcase-header">
        <h1>Template Library</h1>
        <p>A comprehensive showcase of all available templates and their use cases</p>
      </header>

      <div className="templates-grid">
        {templateNames.map((templateName) => {
          const TemplateComponent = templateRegistry[templateName];
          const sampleData = templateSampleData[templateName];
          const documentation = templateDocs[templateName];

          // Skip if no sample data available
          if (!sampleData) {
            console.warn(`No sample data for template: ${templateName}`);
            return null;
          }

          // Prepare initial state for stateful templates
          const initialState = {};
          if (templateName === 'LeversTemplate') {
            initialState.selectedTimePeriod = sampleData.timeperiods?.[0] || '1 year';
            initialState.selectedStrategy = null;
          }

          return (
            <div key={templateName} className="template-card">
              {/* Template Name and Documentation */}
              <div className="template-header">
                <h2>{templateName}</h2>
                {documentation && (
                  <p className="template-description">{documentation}</p>
                )}
              </div>

              {/* Template Preview */}
              <div className="template-preview">
                <div className="template-wrapper">
                  <TemplateComponent
                    data={sampleData}
                    currentPage={0}
                    totalPages={3}
                    onAction={() => {}}
                    agentState={initialState}
                    onStateChange={() => {}}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

