-- Create database schema for drug discovery platform

-- Compounds table to store molecular structures
CREATE TABLE IF NOT EXISTS compounds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    smiles TEXT NOT NULL,
    molecular_weight DECIMAL(10,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties table to store predicted molecular properties
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    compound_id INTEGER REFERENCES compounds(id),
    property_name VARCHAR(100) NOT NULL,
    predicted_value VARCHAR(100),
    confidence_score DECIMAL(5,2),
    model_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optimization tasks table
CREATE TABLE IF NOT EXISTS optimization_tasks (
    id SERIAL PRIMARY KEY,
    parent_compound_id INTEGER REFERENCES compounds(id),
    target_properties JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Optimized compounds table
CREATE TABLE IF NOT EXISTS optimized_compounds (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES optimization_tasks(id),
    compound_id INTEGER REFERENCES compounds(id),
    optimization_score DECIMAL(5,2),
    improvements JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table for organizing work
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project compounds junction table
CREATE TABLE IF NOT EXISTS project_compounds (
    project_id INTEGER REFERENCES projects(id),
    compound_id INTEGER REFERENCES compounds(id),
    PRIMARY KEY (project_id, compound_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_compounds_smiles ON compounds(smiles);
CREATE INDEX IF NOT EXISTS idx_properties_compound_id ON properties(compound_id);
CREATE INDEX IF NOT EXISTS idx_optimization_tasks_status ON optimization_tasks(status);
CREATE INDEX IF NOT EXISTS idx_optimized_compounds_task_id ON optimized_compounds(task_id);
