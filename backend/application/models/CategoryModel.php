<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CategoryModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function create($data) {
        // Add the category to the database
        return $this->db->insert('categories', $data); // Assuming you have a 'categories' table
    }

    public function get_all() {
        // Retrieve all categories from the database
        $query = $this->db->get('categories');
        return $query->result_array();
    }

    public function delete($id) {
        // Delete the category from the database
        return $this->db->delete('categories', ['id' => $id]); // Assuming 'id' is the primary key
    }
}