CREATE DATABASE algo_analyzer;

-- ============================================
-- ALGORITHM ANALYZER v1 - DATABASE SCHEMA
-- ============================================

-- 1. ALGORITHMS TABLE
-- Stores metadata and complexity for each algorithm
CREATE TABLE algorithms (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(100) NOT NULL UNIQUE,  -- e.g. "bubble-sort"
    category        VARCHAR(50) NOT NULL,           -- 'array' | 'stack' | 'linked_list'
    subcategory     VARCHAR(50),                    -- 'sorting' | 'searching' | 'operation'
    description     TEXT NOT NULL,
    time_best       VARCHAR(20) NOT NULL,           -- e.g. "O(n)"
    time_avg        VARCHAR(20) NOT NULL,           -- e.g. "O(n²)"
    time_worst      VARCHAR(20) NOT NULL,           -- e.g. "O(n²)"
    space_complexity VARCHAR(20) NOT NULL,          -- e.g. "O(1)"
    is_stable       BOOLEAN DEFAULT NULL,           -- only relevant for sorting
    order_index     INT,                            -- controls display order in UI
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 2. ALGORITHM CODES TABLE
-- Stores Java and C++ implementations
CREATE TABLE algorithm_codes (
    id              SERIAL PRIMARY KEY,
    algorithm_id    INT NOT NULL REFERENCES algorithms(id) ON DELETE CASCADE,
    language        VARCHAR(20) NOT NULL,           -- 'java' | 'cpp'
    code            TEXT NOT NULL,                  -- full implementation
    highlight_map   JSONB,                          
    -- maps step_number → line numbers to highlight
    -- e.g. { "0": [3,4], "1": [5], "2": [6,7] }
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(algorithm_id, language)
);

-- 3. DEFAULT STEPS TABLE
-- Pre-seeded steps for demo/default visualization
CREATE TABLE steps (
    id              SERIAL PRIMARY KEY,
    algorithm_id    INT NOT NULL REFERENCES algorithms(id) ON DELETE CASCADE,
    step_number     INT NOT NULL,
    description     TEXT NOT NULL,                  -- "Comparing index 0 and 1"
    action          VARCHAR(50),                    -- 'compare' | 'swap' | 'push' | 'pop' | 'insert' | 'delete' | 'traverse' | 'found'
    state           JSONB NOT NULL,
    -- Array example:   { "array": [5,3,8], "comparing": [0,1], "sorted": [] }
    -- Stack example:   { "stack": [10,20,30], "top": 2, "action": "push", "value": 30 }
    -- LL example:      { "nodes": [1,2,3], "pointers": {"head":0,"current":1}, "action": "traverse" }
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(algorithm_id, step_number)
);

CREATE TYPE language_type AS ENUM ('java', 'cpp');

-- 4. COMPARISONS TABLE
-- Defines valid algorithm pairs for side-by-side comparison
CREATE TABLE comparisons (
    id              SERIAL PRIMARY KEY,
    algorithm_a_id  INT NOT NULL REFERENCES algorithms(id) ON DELETE CASCADE,
    algorithm_b_id  INT NOT NULL REFERENCES algorithms(id) ON DELETE CASCADE,
    note            TEXT,                           -- "Both O(n²) but insertion sort performs better on nearly sorted data"
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(algorithm_a_id, algorithm_b_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_algorithms_category    ON algorithms(category);
CREATE INDEX idx_algorithms_slug        ON algorithms(slug);
CREATE INDEX idx_steps_algorithm_id     ON steps(algorithm_id);
CREATE INDEX idx_codes_algorithm_id     ON algorithm_codes(algorithm_id);
CREATE INDEX idx_comparisons_a          ON comparisons(algorithm_a_id);
CREATE INDEX idx_comparisons_b          ON comparisons(algorithm_b_id);


select * from algorithms

-- ============================================
-- SEED DATA - ALGORITHMS
-- ============================================
INSERT INTO algorithms 
    (name, slug, category, subcategory, description, time_best, time_avg, time_worst, space_complexity, is_stable, order_index)
VALUES
-- Arrays - Sorting
('Bubble Sort',    'bubble-sort',    'array', 'sorting',   'Repeatedly swaps adjacent elements if they are in wrong order.',                          'O(n)',   'O(n²)',     'O(n²)',    'O(1)',  true,  1),
('Selection Sort', 'selection-sort', 'array', 'sorting',   'Finds the minimum element and places it at the beginning each pass.',                     'O(n²)',  'O(n²)',     'O(n²)',    'O(1)',  false, 2),
('Insertion Sort', 'insertion-sort', 'array', 'sorting',   'Builds sorted array one element at a time by inserting into correct position.',           'O(n)',   'O(n²)',     'O(n²)',    'O(1)',  true,  3),
-- Arrays - Searching
('Binary Search',  'binary-search',  'array', 'searching', 'Searches sorted array by repeatedly halving the search interval.',                        'O(1)',   'O(log n)',  'O(log n)', 'O(1)',  NULL,  4),
('Linear Search',  'linear-search',  'array', 'searching', 'Sequentially checks each element until match is found.',                                  'O(1)',   'O(n)',      'O(n)',     'O(1)',  NULL,  5),
-- Stack
('Stack Push',     'stack-push',     'stack', 'operation', 'Pushes an element onto the top of the stack.',                                            'O(1)',   'O(1)',      'O(1)',     'O(n)',  NULL,  6),
('Stack Pop',      'stack-pop',      'stack', 'operation', 'Removes and returns the top element of the stack.',                                       'O(1)',   'O(1)',      'O(1)',     'O(1)',  NULL,  7),
('Stack Peek',     'stack-peek',     'stack', 'operation', 'Returns the top element without removing it.',                                            'O(1)',   'O(1)',      'O(1)',     'O(1)',  NULL,  8),
('isEmpty Check',  'stack-isempty',  'stack', 'operation', 'Checks whether the stack has no elements.',                                               'O(1)',   'O(1)',      'O(1)',     'O(1)',  NULL,  9),
-- Linked List
('LL Insert Head', 'll-insert-head', 'linked_list', 'operation', 'Inserts a new node at the beginning of the linked list.',                           'O(1)',   'O(1)',      'O(1)',     'O(1)',  NULL,  10),
('LL Insert Tail', 'll-insert-tail', 'linked_list', 'operation', 'Inserts a new node at the end of the linked list.',                                 'O(n)',   'O(n)',      'O(n)',     'O(1)',  NULL,  11),
('LL Delete Node', 'll-delete-node', 'linked_list', 'operation', 'Removes a node with a given value from the linked list.',                           'O(1)',   'O(n)',      'O(n)',     'O(1)',  NULL,  12),
('LL Traversal',   'll-traversal',   'linked_list', 'operation', 'Visits each node in the list sequentially from head to tail.',                      'O(n)',   'O(n)',      'O(n)',     'O(1)',  NULL,  13);