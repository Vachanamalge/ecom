<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CategoryController extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('CategoryModel'); // Ensure the model is loaded correctly
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST, GET, DELETE");
    }

    public function create() {
        // Get the input data
        $data = json_decode(file_get_contents("php://input"), true);

        // Log incoming data for debugging
        log_message('debug', 'Create category data: ' . json_encode($data));

        // Validate input data
        if (empty($data['name'])) {
            echo json_encode(['status' => 'error', 'message' => 'Category name is required.']);
            return;
        }

        // Attempt to create the category
        if ($this->CategoryModel->create($data)) {
            echo json_encode(['status' => 'success', 'message' => 'Category created successfully!']);
        } else {
            log_message('error', 'Category creation failed: ' . $this->db->last_query());
            echo json_encode(['status' => 'error', 'message' => 'Category creation failed.']);
        }
    }

    public function get_all() {
        // Fetch all categories from the database
        $categories = $this->CategoryModel->get_all();
        echo json_encode(['status' => 'success', 'data' => $categories]);
    }

    public function delete($id) {
        // Attempt to delete the category
        if ($this->CategoryModel->delete($id)) {
            echo json_encode(['status' => 'success', 'message' => 'Category deleted successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Category deletion failed.']);
        }
    }
}