-- Seed data for drug discovery platform

-- Insert sample compounds
INSERT INTO compounds (name, smiles, molecular_weight) VALUES
('Aspirin', 'CC(=O)OC1=CC=CC=C1C(=O)O', 180.16),
('Caffeine', 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', 194.19),
('Ibuprofen', 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O', 206.28),
('Paracetamol', 'CC(=O)NC1=CC=C(C=C1)O', 151.16),
('Penicillin G', 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C', 334.39);

-- Insert sample properties
INSERT INTO properties (compound_id, property_name, predicted_value, confidence_score, model_version) VALUES
(1, 'Solubility', 'High', 92.5, 'v1.2'),
(1, 'Toxicity', 'Low', 88.3, 'v1.2'),
(1, 'Bioavailability', 'Medium', 85.7, 'v1.2'),
(2, 'Solubility', 'High', 94.2, 'v1.2'),
(2, 'Toxicity', 'Low', 91.8, 'v1.2'),
(2, 'Bioavailability', 'High', 89.4, 'v1.2'),
(3, 'Solubility', 'Medium', 87.6, 'v1.2'),
(3, 'Toxicity', 'Low', 93.1, 'v1.2'),
(3, 'Bioavailability', 'High', 91.2, 'v1.2');

-- Insert sample projects
INSERT INTO projects (name, description, status) VALUES
('Kinase Inhibitor Discovery', 'Development of novel kinase inhibitors for cancer treatment', 'active'),
('Antibiotic Resistance', 'New antibiotics to combat resistant bacterial strains', 'active'),
('CNS Drug Development', 'Central nervous system therapeutics', 'planning');

-- Link compounds to projects
INSERT INTO project_compounds (project_id, compound_id) VALUES
(1, 1), (1, 3), (2, 5), (3, 2);

-- Insert sample optimization tasks
INSERT INTO optimization_tasks (parent_compound_id, target_properties, status, progress) VALUES
(1, '{"solubility": 80, "toxicity": 15, "bioavailability": 85}', 'completed', 100),
(3, '{"solubility": 75, "toxicity": 20, "bioavailability": 90}', 'running', 65);
