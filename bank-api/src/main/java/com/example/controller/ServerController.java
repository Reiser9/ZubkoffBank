package com.example.controller;

import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.payload.TypeResponse;
import com.example.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class ServerController {

    @Autowired
    private TypeService typeService;

    @GetMapping("/health")
    public ResponseEntity<?> checkHealth() {
        return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
    }

    @GetMapping("/types")
    public List<TypeResponse> getTypes() {
        List<TypeResponse> typesResponse = new ArrayList<>();
        for (Type type: typeService.findAll()) {
            typesResponse.add(new TypeResponse(type));
        }
        return typesResponse;
    }

    @GetMapping("/image")
	public ResponseEntity<Resource> GetImageCard(@RequestParam("id") int id) throws IOException {
		Type type = typeService.findTypeById(id);
		Path path = Paths.get("uploads/" + "filename");
		Resource resource = new UrlResource(path.toUri());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                .header("type", type.getType())
//                .header("description", type.getDescription())
//                .header("limit", String.valueOf(type.getLimit()))
				.contentType(MediaType.IMAGE_PNG)
				.body(resource);
	}
}
