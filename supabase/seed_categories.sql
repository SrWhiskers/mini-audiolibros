-- Seed file for categories organized by families
-- Execute manually in Supabase Dashboard > SQL Editor

-- 1. Limpiar category_id legacy en audiobooks
UPDATE audiobooks SET category_id = NULL
WHERE category_id IN ('filosofia', 'ciencia', 'literatura', 'psicologia');

-- 2. Eliminar relaciones de categorías antiguas
DELETE FROM audiobook_categories
WHERE category_id IN ('filosofia', 'ciencia', 'literatura', 'psicologia');

-- 3. Eliminar categorías antiguas
DELETE FROM categories
WHERE id IN ('filosofia', 'ciencia', 'literatura', 'psicologia');

-- 4. Insertar nuevas categorías (41 total)
INSERT INTO categories (id, name) VALUES
  -- TRAD: Tradición cultural / civilizatoria (10)
  ('trad:grecia', 'Grecia clásica'),
  ('trad:roma', 'Roma'),
  ('trad:judeocristiana', 'Judeocristiana'),
  ('trad:moderna', 'Modernidad europea'),
  ('trad:ilustracion', 'Ilustración'),
  ('trad:oriental', 'Oriente (budismo, taoísmo, etc.)'),
  ('trad:islam', 'Islam'),
  ('trad:indigena', 'Tradiciones indígenas'),
  ('trad:latinoamerica', 'Latinoamérica'),
  ('trad:anglosajon', 'Mundo anglosajón'),

  -- TIPO: Tipo de obra (8)
  ('tipo:tratado', 'Tratado / ensayo filosófico'),
  ('tipo:dialogo', 'Diálogo'),
  ('tipo:meditacion', 'Meditación / reflexión personal'),
  ('tipo:carta', 'Carta / epístola'),
  ('tipo:autobiografia', 'Autobiografía / confesión'),
  ('tipo:ficcion', 'Ficción con contenido filosófico'),
  ('tipo:poetico', 'Texto poético / aforístico'),
  ('tipo:manual', 'Manual / guía práctica'),

  -- TEMA: Eje temático fuerte (15)
  ('tema:etica', 'Ética, virtud y carácter'),
  ('tema:politica', 'Política y sociedad'),
  ('tema:muerte', 'Muerte e inmortalidad'),
  ('tema:conocimiento', 'Conocimiento y verdad'),
  ('tema:naturaleza', 'Naturaleza y cosmos'),
  ('tema:libertad', 'Libertad y determinismo'),
  ('tema:amor', 'Amor y amistad'),
  ('tema:dios', 'Dios y lo sagrado'),
  ('tema:existencia', 'Sentido de la existencia'),
  ('tema:mente', 'Mente, conciencia y yo'),
  ('tema:lenguaje', 'Lenguaje y comunicación'),
  ('tema:belleza', 'Belleza y arte'),
  ('tema:poder', 'Poder y dominación'),
  ('tema:justicia', 'Justicia y derecho'),
  ('tema:tiempo', 'Tiempo y memoria'),

  -- PRACT: Etiquetas prácticas (8)
  ('pract:estoicismo', 'Estoicismo'),
  ('pract:epicureismo', 'Epicureísmo'),
  ('pract:existencialismo', 'Existencialismo'),
  ('pract:idealismo', 'Idealismo'),
  ('pract:empirismo', 'Empirismo'),
  ('pract:racionalismo', 'Racionalismo'),
  ('pract:fenomenologia', 'Fenomenología'),
  ('pract:pragmatismo', 'Pragmatismo')

ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
